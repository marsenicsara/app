package com.hedvig.app.utils

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import com.hedvig.app.MainActivity
import timber.log.Timber

fun Context.triggerRestart(){
    Timber.i("triggerRestart")
    val mStartActivity = Intent(this, MainActivity::class.java)
    val mPendingIntentId = 56665
    val mPendingIntent = PendingIntent.getActivity(this, mPendingIntentId, mStartActivity, PendingIntent.FLAG_CANCEL_CURRENT)
    val mgr = this.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, mPendingIntent)
    System.exit(0)
}
