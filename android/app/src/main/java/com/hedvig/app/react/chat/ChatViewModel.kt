package com.hedvig.app.react.chat

import android.arch.lifecycle.ViewModel
import io.reactivex.disposables.CompositeDisposable
import timber.log.Timber
import javax.inject.Inject

class ChatViewModel @Inject constructor(private val chatRepository: ChatRepository) : ViewModel() {

    private val compositeDisposable = CompositeDisposable()

    fun logout(callback: () -> Unit) {
        compositeDisposable.add(
            chatRepository
                .logout()
                .subscribe({
                    callback()
                }, { error ->
                    Timber.e(error, "Failed to log out")
                })
        )
    }
}
