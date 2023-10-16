package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.dto.NewsResponse;
import com.prodamgarage.mindasengine.dto.ProjectResponse;
import com.prodamgarage.mindasengine.services.NewsService;
import com.prodamgarage.mindasengine.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class UserController {
    private final ProjectService projectService;
    private final NewsService newsService;
    public UserController(ProjectService projectService, NewsService newsService) {
        this.projectService = projectService;
        this.newsService = newsService;
    }
    @Async
    @GetMapping("projects")
    public CompletableFuture<ResponseEntity<List<ProjectResponse>>> allProject() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        if (projects == null) {
            return CompletableFuture.completedFuture(ResponseEntity.notFound().build());
        }
        return CompletableFuture.completedFuture(ResponseEntity.ok(projects));
    }
    @Async
    @GetMapping("/news")
    public CompletableFuture<ResponseEntity<List<NewsResponse>>> allNews() {
        List<NewsResponse> news = newsService.getAllNews();
        if (news == null) {
            return CompletableFuture.completedFuture(ResponseEntity.notFound().build());
        }
        return CompletableFuture.completedFuture(ResponseEntity.ok(news));
    }

}
