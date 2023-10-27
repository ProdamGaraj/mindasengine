package com.prodamgarage.mindasengine.controllers.moderator;

import com.prodamgarage.mindasengine.dto.NewsRequest;
import com.prodamgarage.mindasengine.dto.ProjectRequest;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.services.PostServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/moderator")
@RequiredArgsConstructor
public class ModeratorController {
    private final PostServiceFactory postServiceFactory;
    @GetMapping("/get/projects")
    public ResponseEntity<?> allProject() {
        List<?> projects = postServiceFactory.createService(new Project()).getAll();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/upload/project")
    public ResponseEntity<?> saveProject(@RequestBody ProjectRequest projectRequest) throws IOException {
        Project project = new Project(projectRequest.getName(), projectRequest.getDescription());
        postServiceFactory.createService(new Project()).save(project, projectRequest.getMultipartFiles());
        return ResponseEntity.ok("Upload project");
    }
    @DeleteMapping("/delete/project")
    public ResponseEntity<?> deleteProject(@RequestParam Long id)  {
        postServiceFactory.createService(new Project()).delete(id);
        return ResponseEntity.ok("Delete project");
    }
    @PutMapping("/update/project")
    public ResponseEntity<?> updateProject(ProjectRequest projectRequest) throws IOException {
        postServiceFactory.createService(new Project()).update(new Project(projectRequest.getName(), projectRequest.getDescription()), projectRequest.getMultipartFiles(), projectRequest.getId());
        return ResponseEntity.ok("Update project");
    }


    @GetMapping("/get/news")
    public ResponseEntity<?> allNews() {
        List<?> news = postServiceFactory.createService(new News()).getAll();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }
    @PostMapping("/upload/news")
    public ResponseEntity<?> saveNews(NewsRequest newsRequest) throws IOException {
        postServiceFactory.createService(new News()).save(new News(newsRequest.getName(), newsRequest.getDescription(), newsRequest.getPublication()), newsRequest.getMultipartFiles());
        return ResponseEntity.ok("Upload news");
    }
    @DeleteMapping("/delete/news")
    public ResponseEntity<?> deleteNews(@RequestParam Long id)  {
        postServiceFactory.createService(new News()).delete(id);
        return ResponseEntity.ok("Delete news");
    }
    @PutMapping("/update/news")
    public ResponseEntity<?> updateNews(NewsRequest newsRequest) throws IOException {
        postServiceFactory.createService(new News()).update(new News(newsRequest.getName(), newsRequest.getDescription(), newsRequest.getPublication()), newsRequest.getMultipartFiles(), newsRequest.getId());
        return ResponseEntity.ok("Update news");
    }
}