package ngdemo.web.rest;

import com.google.inject.Inject;

import ngdemo.domain.Project;
import ngdemo.domain.User;
import ngdemo.service.contract.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;

/*
 * The REST API for user services
 */
@Path("/users")
public class UserRestService {

    private final UserService userService;
    
    @Inject
    public UserRestService(UserService userService) {
        this.userService = userService;
    }
    
    

    @GET
    @Path("numberOfUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public int getNumberOfUsers() {
        return userService.getNumberOfUsers();
    }
    
    @GET
    @Path("getProjects")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Project> getProjects() {
        List <Project> projectList = new ArrayList<Project>();
        Project pro1 = new Project();
        pro1.setName("CMS");
        pro1.setTechnology("AngularJS");
        
        Project pro2 = new Project();
        pro2.setName("PTV");
        pro2.setTechnology("Java");
        
        projectList.add(pro1);
        projectList.add(pro2);
        
        return projectList;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsersInJSON() {
        return userService.getAllUsers();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserById(@PathParam("id") int id) {
        return userService.getById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User create(User user) {
        return userService.createNewUser(user);
    }
    
    @POST
    @Path("createNewUser")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createNewUser(User user) {
    	System.out.println("====================================  createNewUser =========================================");
        return null;
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User update(User user) {
        return userService.update(user);
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public void remove(@PathParam("id") int id) {
        userService.remove(id);
    }
}
