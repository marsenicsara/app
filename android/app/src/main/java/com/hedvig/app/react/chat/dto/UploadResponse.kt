package com.hedvig.app.react.chat.dto

data class UploadResponse(
    val data: UploadData?,
    val errors: List<UploadError>?
)
