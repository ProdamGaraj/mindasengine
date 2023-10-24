package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.dto.NewsResponse;
import com.prodamgarage.mindasengine.dto.ProjectResponse;
import com.prodamgarage.mindasengine.services.NewsService;
import com.prodamgarage.mindasengine.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    ProjectService projectService;
    @Autowired
    NewsService newsService;
    @GetMapping("projects")
    public ResponseEntity<Object> allProject() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/news")
    public ResponseEntity<List<NewsResponse>> allNews() {
        List<NewsResponse> news = newsService.getAllNews();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }

}
