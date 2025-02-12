package com.monozero69.contacts.api.web;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monozero69.contacts.api.model.Contact;
import com.monozero69.contacts.api.repository.ContactRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ContactController.class)
@ActiveProfiles("test")
@DisplayName("the contact controller")
public class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockitoBean
    private ContactRepository contactRepository;
    
    @Autowired
    ObjectMapper objectMapper;    
    
    @Autowired
    private ContactController contactController;

    @Test
    @DisplayName("should exists")
    void shouldExists() {
        assertThat(contactController).isNotNull();
    }

    @Test
    @DisplayName("shouldCreateNewContact")
    void shouldCreateNewContact() throws Exception {
        var newContact = new Contact(
                                "Jack", 
                                "Cody", 
                                "01234567890", 
                                "fake@test.com",
                                "first line of address",
                                "second line of adddress",
                                "third line of address",
                                "Test City",
                                "Test County",
                                "LS1 3WE",
                                "England"
                            );
        when(contactRepository.save(newContact)).thenAnswer(invocationOnMock ->{
                    Contact contact = invocationOnMock.getArgument(0);

                    var savedContact = new Contact(
                        contact.getFirstname(),
                        contact.getLastname(),
                        contact.getPhonenumber(),
                        contact.getEmail(),
                        contact.getFirstLineOfAddress(),
                        contact.getSecondLineOfAddress(),
                        contact.getThirdLineOfAddress(),
                        contact.getCity(),
                        contact.getCounty(),
                        contact.getPostcode(),
                        contact.getCountry()
                    );

                    savedContact.setId(200L);

                    return savedContact;
        });

        var response = mockMvc.perform(
                                post("/api/contacts")
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .content(objectMapper.writeValueAsString(newContact))
                        );
        
        response
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", is(equalTo("/api/contacts/200"))))
            .andExpect(jsonPath("$.id", is(equalTo(200))))
            .andExpect(jsonPath("$.firstname", is(equalTo(newContact.getFirstname()))))
            .andExpect(jsonPath("$.lastname", is(equalTo(newContact.getLastname()))))
            .andExpect(jsonPath("$.phonenumber", is(equalTo(newContact.getPhonenumber()))))
            .andExpect(jsonPath("$.email", is(equalTo(newContact.getEmail()))))
            .andExpect(jsonPath("$.firstLineOfAddress", is(equalTo(newContact.getFirstLineOfAddress()))))
            .andExpect(jsonPath("$.secondLineOfAddress", is(equalTo(newContact.getSecondLineOfAddress()))))
            .andExpect(jsonPath("$.thirdLineOfAddress", is(equalTo(newContact.getThirdLineOfAddress()))))
            .andExpect(jsonPath("$.city", is(equalTo(newContact.getCity()))))
            .andExpect(jsonPath("$.county", is(equalTo(newContact.getCounty()))))
            .andExpect(jsonPath("$.postcode", is(equalTo(newContact.getPostcode()))))
            .andExpect(jsonPath("$.country", is(equalTo(newContact.getCountry()))));
    }


}