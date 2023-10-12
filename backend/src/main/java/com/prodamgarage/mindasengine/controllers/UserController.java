package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.dto.NewsDTO;
import com.prodamgarage.mindasengine.dto.ProjectDTO;
import com.prodamgarage.mindasengine.services.NewsService;
import com.prodamgarage.mindasengine.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/landing")
public class UserController {
    private final ProjectService projectService;
    private final NewsService newsService;
    public UserController(ProjectService projectService, NewsService newsService) {
        this.projectService = projectService;
        this.newsService = newsService;
    }
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> allProject() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/news")
    public ResponseEntity<List<NewsDTO>> allNews() {
        List<NewsDTO> news = newsService.getAllNews();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }

}
