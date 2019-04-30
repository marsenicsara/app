package com.hedvig.app

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase

import com.facebook.react.modules.storage.ReactDatabaseSupplier
import com.hedvig.android.owldroid.util.react.AsyncStorageNative
import timber.log.Timber

import javax.inject.Inject

class AsyncStorageNativeImpl @Inject constructor(
    private val context: Context
) : AsyncStorageNative {

    private val inMemoryCache = HashMap<String, String>()

    override fun getKey(key: String): String? {
        if (inMemoryCache.containsKey(key)) {
            val value = inMemoryCache[key]
            Timber.i("Cache hit: $key: $value")
            return value
        }
        var readableDatabase: SQLiteDatabase? =
            null
        var catalystLocalStorage: Cursor? = null
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).readableDatabase
            catalystLocalStorage = readableDatabase.query(
                TABLE,
                arrayOf("key", "value"),
                "key = ?",
                arrayOf(key), null, null, null
            )

            return if (catalystLocalStorage!!.moveToFirst()) {
                val value = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"))
                inMemoryCache[key] = value
                return value
            } else {
                null
            }
        } finally {
            catalystLocalStorage?.close()
            readableDatabase?.close()
        }
    }

    override fun setKey(key: String, value: String) {
        var database: SQLiteDatabase? = null
        try {
            database = ReactDatabaseSupplier.getInstance(context).writableDatabase
            database?.insert(TABLE, null, ContentValues().apply {
                put("key", key)
                put("value", value)
            })
            inMemoryCache[key] = value
        } finally {
            database?.close()
        }
    }

    override fun deleteKey(key: String) {
        if (inMemoryCache.containsKey(key)) {
            inMemoryCache.remove(key)
        }
        var database: SQLiteDatabase? = null
        try {
            database = ReactDatabaseSupplier.getInstance(context).writableDatabase
            database?.delete(TABLE, "key = ?", arrayOf(key))
        } finally {
            database?.close()
        }
    }

    companion object {
        private const val TABLE = "catalystLocalStorage"
    }
}


