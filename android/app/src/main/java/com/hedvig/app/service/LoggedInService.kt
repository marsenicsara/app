package com.hedvig.app.service

import android.content.Context
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.Rx2Apollo
import com.hedvig.android.owldroid.graphql.InsuranceStatusQuery
import com.hedvig.android.owldroid.type.InsuranceStatus
import com.hedvig.app.util.extensions.isLoggedIn
import com.hedvig.app.util.extensions.setIsLoggedIn
import com.hedvig.app.util.react.AsyncStorageNative
import io.reactivex.Observable
import javax.inject.Inject

class LoggedInService @Inject constructor(
    private val apolloClient: ApolloClient,
    private val asyncStorageNative: AsyncStorageNative,
    private val context: Context
) {
    fun isLoggedIn(): Observable<Boolean> {
        if (context.isLoggedIn()) {
            return Observable.just(true)
        }

        asyncStorageNative.getKey("@hedvig:token") ?: return Observable.just(false)

        return Rx2Apollo.from(apolloClient.query(InsuranceStatusQuery()))
            .map { response ->
                response.data()?.insurance()?.status()?.let { status ->
                    when (status) {
                        InsuranceStatus.ACTIVE,
                        InsuranceStatus.INACTIVE,
                        InsuranceStatus.INACTIVE_WITH_START_DATE -> {
                            context.setIsLoggedIn(true)
                            true
                        }
                        InsuranceStatus.PENDING,
                        InsuranceStatus.`$UNKNOWN` -> {
                            context.setIsLoggedIn(false)
                            false
                        }
                        else -> false
                    }
                } ?: false
            }
    }
}
