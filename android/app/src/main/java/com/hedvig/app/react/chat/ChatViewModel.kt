package com.hedvig.app.react.chat

import android.arch.lifecycle.ViewModel
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.rxkotlin.plusAssign
import timber.log.Timber
import javax.inject.Inject

class ChatViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {

    private val disposables = CompositeDisposable()

    fun logout(callback: () -> Unit) {
        disposables += userRepository
            .logout()
            .subscribe({
                callback()
            }, { error ->
                Timber.e(error, "Failed to log out")
            })
    }
}
