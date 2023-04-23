package com.example.demo.Service;

import com.example.demo.Model.Photo;
import com.example.demo.Repo.PhotoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PhotoService {

   @Autowired
   private PhotoRepository repo;

    public String addPhoto(String title, MultipartFile upload, String type) throws IOException {
        Photo photo = new Photo(title);
        photo.setImage(new Binary(BsonBinarySubType.BINARY, upload.getBytes()));
        photo.setType(type);
        photo = repo.insert(photo);
        return photo.getId();
    }

    public Photo getPhoto(String id) {
        return repo.findById(id).get();
    }


}
