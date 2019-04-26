package com.hedvig.app.utils

import android.app.AlarmManager
import android.app.Dialog
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.support.v4.content.ContextCompat
import android.view.LayoutInflater
import android.view.View
import com.hedvig.app.MainActivity
import com.hedvig.app.R
import timber.log.Timber

fun Context.triggerRestart(){
    val startActivity = Intent(this, MainActivity::class.java)
    val pendingIntentId = 56665
    val pendingIntent = PendingIntent.getActivity(this, pendingIntentId, startActivity, PendingIntent.FLAG_CANCEL_CURRENT)
    val mgr = this.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, pendingIntent)
    System.exit(0)
}

fun Context.showRestartDialog(restart: () ->  Unit){
    val dialog = Dialog(this)
    val resetDialogView = LayoutInflater.from(this).inflate(R.layout.reset_onboarding_dialog, null)
    dialog.window!!.setBackgroundDrawable(
        ContextCompat.getDrawable(
            this,
            R.drawable.dialog_background
        )
    )
    dialog.setContentView(resetDialogView)

    resetDialogView.findViewById<View>(R.id.chatResetDialogNegativeButton)
        .setOnClickListener { dialog.dismiss() }
    resetDialogView.findViewById<View>(R.id.chatResetDialogPositiveButton).setOnClickListener {
        dialog.dismiss()
        restart()
    }

    dialog.show()
}
