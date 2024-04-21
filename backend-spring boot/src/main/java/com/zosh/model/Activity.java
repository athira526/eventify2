package com.zosh.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private Long price;
    
    @ManyToOne
    private Category activityCategory;


    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private boolean available;

//    @JsonIgnore
    @ManyToOne
    private Fest fest;
    
    private boolean isOffline;
    private boolean isGroupFreeWorkshop;
    
    @ManyToMany
    private List<SkillsItem> skills=new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;


    
}
