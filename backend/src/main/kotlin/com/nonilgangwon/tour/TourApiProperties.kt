package com.nonilgangwon.tour

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "tour.api")
class TourApiProperties {
    var key: String = ""
    var baseUrl: String = ""
}
