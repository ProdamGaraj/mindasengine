package com.prodamgarage.mindasengine.config;

import com.prodamgarage.mindasengine.security.jwt.AuthEntryPointJwt;
import com.prodamgarage.mindasengine.security.jwt.AuthTokenFilter;
import com.prodamgarage.mindasengine.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/projects").permitAll()
                                .requestMatchers("/news").permitAll()
                                .requestMatchers("/images/**").permitAll()
                                .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
/*    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // Список источников из белого списка
        configuration.setAllowedMethods(List.of("*")); // Список разделенных запятыми методов HTTP, которые веб-сервер допускает для запросов между источниками
        configuration.setAllowCredentials(true); // Если браузер отправляет запрос на сервер, передавая учетные данные (в виде файлов cookie или заголовков авторизации), его значение устанавливается равным true
        configuration.setAllowedHeaders(List.of("*")); // Список HTTP-заголовков, разделенных запятыми, которые веб-сервер допускает для запросов между источниками
        configuration.setExposedHeaders(List.of("*")); // Список HTTP-заголовков, разделенных запятыми, которые клиентский сценарий может считать безопасными для отображения
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }*/

    @Bean
    //TODO: Checkout headers
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Список источников из белого списка
        configuration.setAllowedMethods(List.of("GET","POST","PATCH", "PUT", "DELETE", "OPTIONS", "HEAD")); // Список разделенных запятыми методов HTTP, которые веб-сервер допускает для запросов между источниками
        configuration.setAllowCredentials(true); // Если браузер отправляет запрос на сервер, передавая учетные данные (в виде файлов cookie или заголовков авторизации), его значение устанавливается равным true
        configuration.setAllowedHeaders(List.of("Authorization",
                "Requestor-Type",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin",
                "Referer",
                "Sec-Fetch-Mode",
                "Sec-Fetch-Site",
                "X-XSRF-TOKEN")); // Список HTTP-заголовков, разделенных запятыми, которые веб-сервер допускает для запросов между источниками
        configuration.setExposedHeaders(List.of("X-Get-Header",
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "X-XSRF-TOKEN")); // Список HTTP-заголовков, разделенных запятыми, которые клиентский сценарий может считать безопасными для отображения
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
