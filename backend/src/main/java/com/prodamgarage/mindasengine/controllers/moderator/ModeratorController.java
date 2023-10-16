package com.prodamgarage.mindasengine.controllers.moderator;

import com.prodamgarage.mindasengine.dto.NewsResponse;
import com.prodamgarage.mindasengine.dto.ProjectResponse;
import com.prodamgarage.mindasengine.dto.NewsRequest;
import com.prodamgarage.mindasengine.dto.ProjectRequest;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.services.NewsService;
import com.prodamgarage.mindasengine.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:1337", maxAge = 3600)
@RequestMapping("/moderator")
public class ModeratorController {
    private final ProjectService projectService;
    private final NewsService newsService;
    public ModeratorController(ProjectService projectService, NewsService newsService) {
        this.projectService = projectService;
        this.newsService = newsService;
    }




    @GetMapping("/get/projects")
    public ResponseEntity<List<ProjectResponse>> allProject() {
        List<ProjectResponse> projects = projectService.getAllProjects();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @PostMapping("/upload/project")
    public ResponseEntity<?> saveProject(ProjectRequest projectRequest) throws IOException {
        projectService.saveProject(new Project(projectRequest.getName(), projectRequest.getDescription()), projectRequest.getMultipartFiles());
        return ResponseEntity.ok("Upload project");
    }
    @DeleteMapping("/delete/project")
    public ResponseEntity<?> deleteProject(@RequestParam Long id)  {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Delete project");
    }
    @PutMapping("/update/project")
    public ResponseEntity<?> updateProject(ProjectRequest projectRequest) {
        projectService.updateProject(new Project(projectRequest.getName(), projectRequest.getDescription()), projectRequest.getMultipartFiles(), projectRequest.getId());
        return ResponseEntity.ok("Update project");
    }




    @GetMapping("/get/news")
    public ResponseEntity<List<NewsResponse>> allNews() {
        List<NewsResponse> news = newsService.getAllNews();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }
    @PostMapping("/upload/news")
    public ResponseEntity<?> saveNews(NewsRequest newsRequest) throws IOException {
        newsService.saveNews(new News(newsRequest.getName(), newsRequest.getDescription(), newsRequest.getPublication()), newsRequest.getMultipartFiles());
        return ResponseEntity.ok("Upload news");
    }
    @DeleteMapping("/delete/news")
    public ResponseEntity<?> deleteNews(@RequestParam Long id)  {
        newsService.deleteNews(id);
        return ResponseEntity.ok("Delete news");
    }
    @PutMapping("/update/news")
    public ResponseEntity<?> updateNews(NewsRequest newsRequest) {
        newsService.updateNews(new News(newsRequest.getName(), newsRequest.getDescription(), newsRequest.getPublication()), newsRequest.getMultipartFiles(), newsRequest.getId());
        return ResponseEntity.ok("Update news");
    }

}