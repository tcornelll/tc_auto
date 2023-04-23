package com.example.demo.Controller;

import com.example.demo.Model.Photo;
import com.example.demo.Service.PhotoService;
import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequestMapping("api/image")
@AllArgsConstructor
public class PhotoController {
    private PhotoService service;

    @PostMapping
    @CrossOrigin
    public String save(@RequestParam("title") String title, @RequestParam("image") MultipartFile image, @RequestParam("type") String type) throws IOException {
        String id = service.addPhoto(title, image, type);
        return id;
    }

    @GetMapping("/{id}")
    @CrossOrigin
    @ResponseBody
    public Photo getPhoto(@PathVariable String id) {
        Photo photo = service.getPhoto(id);
        String base = Base64.getEncoder().encodeToString(photo.getImage().getData());
        return photo;
    }
}
