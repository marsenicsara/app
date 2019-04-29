package com.hedvig.app

import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase

import com.facebook.react.modules.storage.ReactDatabaseSupplier
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader

import javax.inject.Inject

class AsyncStorageNativeReaderImpl @Inject
constructor(private val context: Context) : AsyncStorageNativeReader {

    override fun getKey(key: String): String {
        var readableDatabase: SQLiteDatabase? =
            null
        var catalystLocalStorage: Cursor? = null
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).readableDatabase
            catalystLocalStorage = readableDatabase.query(
                "catalystLocalStorage",
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

    override fun deleteKey(key: String) {
        var readableDatabase: SQLiteDatabase? =
            null
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).readableDatabase
            readableDatabase?.delete("catalystLocalStorage", "key = ?", arrayOf(key))
        } finally {
            readableDatabase?.close()
        }
    }
}


