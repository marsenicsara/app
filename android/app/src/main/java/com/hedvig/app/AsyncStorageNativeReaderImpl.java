package com.hedvig.app;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.hedvig.android.owldroid.util.react.AsyncStorageNativeReader;

import org.jetbrains.annotations.NotNull;

import javax.inject.Inject;

public class AsyncStorageNativeReaderImpl implements AsyncStorageNativeReader {

    private final Context context;

    @Inject
    public AsyncStorageNativeReaderImpl(Context context) {
        this.context = context;
    }

    @NotNull
    @Override
    public String getKey(@NotNull String key) {
        SQLiteDatabase readableDatabase = null;
        Cursor catalystLocalStorage = null;
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
            catalystLocalStorage = readableDatabase.query(
                    "catalystLocalStorage",
                    new String[]{"key", "value"},
                    "key = ?",
                    new String[]{key},
                    null,
                    null,
                    null
            );
            if (catalystLocalStorage.moveToFirst()) {
                return catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"));
            } else {
                throw new RuntimeException(String.format("Could not find key %s", key));
            }
        } finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage.close();
            }
            if (readableDatabase != null) {
                readableDatabase.close();
            }
        }
    }
}
