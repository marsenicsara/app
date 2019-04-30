package com.hedvig.app.di

import android.arch.lifecycle.ViewModel
import com.hedvig.android.owldroid.di.ViewModelKey
import com.hedvig.app.react.chat.ChatViewModel
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class AppViewModelModule {

    @Binds
    @IntoMap
    @ViewModelKey(ChatViewModel::class)
    abstract fun chatViewModel(viewModel: ChatViewModel): ViewModel
}
