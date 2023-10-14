package com.prodamgarage.mindasengine.payload.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.service.annotation.GetExchange;

@Getter
@Setter
public class MessageResponse {
    private String message;
    public MessageResponse(String message) {
        this.message = message;
    }
}
