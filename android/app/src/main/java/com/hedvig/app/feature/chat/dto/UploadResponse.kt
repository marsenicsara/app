package com.hedvig.app.feature.chat.dto

data class UploadResponse(
    val data: UploadData?,
    val errors: List<UploadError>?
)
