package com.hedvig.app.di.worker

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import javax.inject.Inject
import javax.inject.Provider

class WorkerFactory @Inject constructor(
    val workers: MutableMap<Class<out Worker>, Provider<ChildWorkerFactory>>
) : androidx.work.WorkerFactory() {
    override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters
    ) = workers[Class.forName(workerClassName)]
        ?.get()
        ?.create(appContext, workerParameters)
}
