package com.hedvig.app.di

import com.hedvig.app.BuildConfig
import dagger.Module
import dagger.Provides
import javax.inject.Named

@Module
object ConfigModule {
    @Provides
    @JvmStatic
    @Named("GRAPHQL_URL")
    fun graphqlUrl() = BuildConfig.GRAPHQL_URL

    @Provides
    @JvmStatic
    @Named("VERSION_NUMBER")
    fun versionNumber() = BuildConfig.VERSION_NAME

    @Provides
    @JvmStatic
    @Named("APPLICATION_ID")
    fun applicationId() = BuildConfig.APPLICATION_ID

    @Provides
    @JvmStatic
    @Named("BASE_URL")
    fun baseUrl() = BuildConfig.BASE_URL
}
