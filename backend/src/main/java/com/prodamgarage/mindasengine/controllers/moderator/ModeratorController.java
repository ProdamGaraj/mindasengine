package com.prodamgarage.mindasengine.controllers.moderator;

import com.prodamgarage.mindasengine.dto.NewsDTO;
import com.prodamgarage.mindasengine.dto.ProjectDTO;
import com.prodamgarage.mindasengine.dto.UploadNews;
import com.prodamgarage.mindasengine.dto.UploadProject;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.services.NewsService;
import com.prodamgarage.mindasengine.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/moderator")
public class ModeratorController {
    private final ProjectService projectService;
    private final NewsService newsService;
    public ModeratorController(ProjectService projectService, NewsService newsService) {
        this.projectService = projectService;
        this.newsService = newsService;
    }




    @GetMapping("/all/project")
    public ResponseEntity<List<ProjectDTO>> allProject() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @PostMapping("/upload/project")
    public ResponseEntity<?> saveProject(UploadProject uploadProject) throws IOException {
        projectService.saveProject(new Project(uploadProject.getName(), uploadProject.getDescription()), uploadProject.getMultipartFiles());
        return ResponseEntity.ok("Upload project");
    }
    @DeleteMapping("/delete/project")
    public ResponseEntity<?> deleteProject(@RequestParam Long id)  {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Delete project");
    }
    @PutMapping("/update/project")
    public ResponseEntity<?> updateProject(UploadProject uploadProject) throws IOException {
        projectService.updateProject(new Project(uploadProject.getName(), uploadProject.getDescription()), uploadProject.getMultipartFiles(), uploadProject.getId());
        return ResponseEntity.ok("Update project");
    }




    @GetMapping("/all/news")
    public ResponseEntity<List<NewsDTO>> allNews() {
        List<NewsDTO> news = newsService.getAllNews();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }
    @PostMapping("/upload/news")
    public ResponseEntity<?> saveNews(UploadNews uploadNews) throws IOException {
        newsService.saveNews(new News(uploadNews.getName(), uploadNews.getDescription(), uploadNews.getPublication()), uploadNews.getMultipartFiles());
        return ResponseEntity.ok("Upload news");
    }
    @DeleteMapping("/delete/news")
    public ResponseEntity<?> deleteNews(@RequestParam Long id)  {
        newsService.deleteNews(id);
        return ResponseEntity.ok("Delete news");
    }
    @PutMapping("/update/news")
    public ResponseEntity<?> updateNews(UploadNews uploadNews) throws IOException {
        newsService.updateNews(new News(uploadNews.getName(), uploadNews.getDescription(), uploadNews.getPublication()), uploadNews.getMultipartFiles(), uploadNews.getId());
        return ResponseEntity.ok("Update news");
    }

}