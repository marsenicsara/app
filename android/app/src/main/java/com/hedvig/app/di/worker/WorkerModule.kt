package com.hedvig.app.di.worker

import com.hedvig.app.service.PushNotificationWorker
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class WorkerModule {
    @Binds
    abstract fun workerFactory(workerFactory: WorkerFactory): androidx.work.WorkerFactory

    @Binds
    @IntoMap
    @WorkerKey(PushNotificationWorker::class)
    abstract fun pushNotificationWorker(factory: PushNotificationWorker.Factory): ChildWorkerFactory
}
