package com.bw.starter.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    private final String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

}
