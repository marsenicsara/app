package com.hedvig.app.react.chat

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.rx2.Rx2Apollo
import com.hedvig.android.owldroid.graphql.LogoutMutation
import javax.inject.Inject

class ChatRepository @Inject constructor(private val apolloClient: ApolloClient) {

    fun logout() = Rx2Apollo.from(apolloClient.mutate(LogoutMutation()))
}
