package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.services.PostServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {
    private final PostServiceFactory postServiceFactory;
    @GetMapping("projects")
    public ResponseEntity<?> allProject() {
        List<?> projects = postServiceFactory.createService(new Project()).getAll();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/news")
    public ResponseEntity<?> allNews() {
        List<?> news = postServiceFactory.createService(new News()).getAll();
        if (news == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(news);
    }

}
