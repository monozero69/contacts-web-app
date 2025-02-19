package com.monozero69.contacts.api.web;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monozero69.contacts.api.model.Contact;
import com.monozero69.contacts.api.repository.ContactRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static com.monozero69.contacts.api.web.ContactController.CONTACT_REST_API_ENDPOINT;

@WebMvcTest(controllers = ContactController.class)
@ActiveProfiles("test")
@AutoConfigureRestDocs
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

    private static FieldDescriptor[] contactFields = {
                                            fieldWithPath("id").description("Unique indentifier for contact"),
                                            fieldWithPath("firstname").description("First name for contact"),
                                            fieldWithPath("lastname").description("Last name for contact"),
                                            fieldWithPath("phonenumber").description("Phone number for contact"),
                                            fieldWithPath("email").description("Email address for contact"),
                                            fieldWithPath("firstLineOfAddress").description("First line of address for contact"),
                                            fieldWithPath("secondLineOfAddress").description("Second line of address for contact"),
                                            fieldWithPath("thirdLineOfAddress").description("Third line of address for contact"),
                                            fieldWithPath("city").description("City or town for contact"),
                                            fieldWithPath("county").description("UK county for contact"),
                                            fieldWithPath("postcode").description("UK postcode for contact"),
                                            fieldWithPath("country").description("UK country for contact")};

    private static FieldDescriptor[] addContactRequest = Arrays.copyOf(contactFields, contactFields.length);

    {
        addContactRequest[0] = fieldWithPath("id").description("Unique indentifier needs to be null when adding a new contact");
    }

    @Test
    @DisplayName("should exists")
    void shouldExists() {
        assertThat(contactController).isNotNull();
    }

    @Test
    @DisplayName("should create new contact")
    void shouldCreateNewContact() throws Exception {
        var newContact = createContact(null);
        mockSavingNewContact(200L, newContact);

        var response = mockMvc.perform(
                                post(CONTACT_REST_API_ENDPOINT)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .content(objectMapper.writeValueAsString(newContact))
                        );
        
        response
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", is(equalTo("%s/200".formatted(CONTACT_REST_API_ENDPOINT)))))
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
            .andExpect(jsonPath("$.country", is(equalTo(newContact.getCountry()))))
            .andDo(document("add_contact", requestFields(addContactRequest), responseFields(contactFields)));
    }

    @Test
    @DisplayName("should return all saved contacts")
    void shouldReturnAllSavedContacts() throws Exception {
        final var rubyMayContact = createContact(200L);
        when(contactRepository.findAll()).thenAnswer(invocationOnMock -> {            
            return List.of(rubyMayContact);
        });

        var response = mockMvc.perform(
                                get(CONTACT_REST_API_ENDPOINT)
                                    .contentType(MediaType.APPLICATION_JSON)
                        );
        
        response
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id", is(equalTo(200))))
            .andExpect(jsonPath("$[0].firstname", is(equalTo(rubyMayContact.getFirstname()))))
            .andExpect(jsonPath("$[0].lastname", is(equalTo(rubyMayContact.getLastname()))))
            .andExpect(jsonPath("$[0].phonenumber", is(equalTo(rubyMayContact.getPhonenumber()))))
            .andExpect(jsonPath("$[0].email", is(equalTo(rubyMayContact.getEmail()))))
            .andDo(document("get_all_saved_contacts", responseFields(
                                                                                    fieldWithPath("[]")
                                                                                        .description("An array of contacts")
                                                                                )
                                                                                .andWithPrefix("[].", contactFields)
                            )
                    );
    }

    @Test
    @DisplayName("should delete given id contact")
    void shouldDeleteAnExistingContact() throws Exception {
        var response = mockMvc.perform(
                            delete("%s/{id}".formatted(CONTACT_REST_API_ENDPOINT), 333L)
                                .contentType(MediaType.APPLICATION_JSON)
                        );
        
        response
            .andExpect(status().isOk())
            .andDo(document("delete_contact", pathParameters(
                            parameterWithName("id").description("Unique indentifier for the contact you want to delete")
            )));

        verify(contactRepository).deleteById(333L);
    }

    @Test
    @DisplayName("should update contact")
    void shouldUpdateContact() throws Exception {
        var existingContact = createContact(200L);
        when(contactRepository.save(existingContact)).thenReturn(existingContact);
        
        var response = mockMvc.perform(
                                put(CONTACT_REST_API_ENDPOINT)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .content(objectMapper.writeValueAsString(existingContact))
                        );
        
        response
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id", is(equalTo(200))))
            .andExpect(jsonPath("$.firstname", is(equalTo(existingContact.getFirstname()))))
            .andExpect(jsonPath("$.lastname", is(equalTo(existingContact.getLastname()))))
            .andExpect(jsonPath("$.phonenumber", is(equalTo(existingContact.getPhonenumber()))))
            .andExpect(jsonPath("$.email", is(equalTo(existingContact.getEmail()))))
            .andExpect(jsonPath("$.firstLineOfAddress", is(equalTo(existingContact.getFirstLineOfAddress()))))
            .andExpect(jsonPath("$.secondLineOfAddress", is(equalTo(existingContact.getSecondLineOfAddress()))))
            .andExpect(jsonPath("$.thirdLineOfAddress", is(equalTo(existingContact.getThirdLineOfAddress()))))
            .andExpect(jsonPath("$.city", is(equalTo(existingContact.getCity()))))
            .andExpect(jsonPath("$.county", is(equalTo(existingContact.getCounty()))))
            .andExpect(jsonPath("$.postcode", is(equalTo(existingContact.getPostcode()))))
            .andExpect(jsonPath("$.country", is(equalTo(existingContact.getCountry()))))
            .andDo(document("update_contact", requestFields(contactFields), responseFields(contactFields)));

    }

    private static Contact createContact(Long id) {
        final var contact = new Contact(
                            "Ruby", "May", "01274669922", "ruby.may@test.com",
                            "23 Bishop Gates", "Long Drive", "third line of address", 
                            "Bradford", "West Yorkshire", "BD9 3WE", "England"
                    );

        contact.setId(id);

        return contact;       
    }

    private void mockSavingNewContact(Long newId, Contact newContact) {
        when(contactRepository.save(newContact)).thenAnswer(invocationOnMock -> {
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

            savedContact.setId(newId);

            return savedContact;
        });
    }
}