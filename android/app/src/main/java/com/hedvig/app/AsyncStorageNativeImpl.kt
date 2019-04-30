package com.hedvig.app

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase

import com.facebook.react.modules.storage.ReactDatabaseSupplier
import com.hedvig.android.owldroid.util.react.AsyncStorageNative

import javax.inject.Inject

class AsyncStorageNativeImpl @Inject constructor(
    private val context: Context
) : AsyncStorageNative {
    override fun getKey(key: String): String {
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
                catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"))
            } else {
                throw RuntimeException(String.format("Could not find key %s", key))
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
        } finally {
            database?.close()
        }
    }

    override fun deleteKey(key: String) {
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


