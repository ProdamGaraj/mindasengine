package com.prodamgarage.mindasengine.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PostServiceFactory {

    private final ProjectService projectService;
    private final NewsService newsService;

    public PostService createService(Object entity) {
        switch (entity.getClass().getSimpleName()) {
            case "News" -> {
                return newsService;
            }
            case "Project" -> {
                return projectService;
            }
            default -> throw new IllegalArgumentException("Unsupported service type: " + entity.getClass().getSimpleName());

        }
    }
}
