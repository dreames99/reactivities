# Documentation - Neil Cummings Project
## Project overview
## Project Steps
### Section 2 - Walking Skeleton

#### Complete Analysis of all major files

#### Lesson 05 What Section 02 is about
1. a walking skeleton links together main architectural components
2. Architecture and functionality can evolve in parallel
3. use dotnet CLI - `$ dotnet new console`
4. review templates/ scaffold for the project
5. 4 projects will be created - API; Application (Business logic); 
Domain (Entities); Persistence
6. Will be able to retrieve data values into a basic web (React) page
7. Key components of .NetCore App - Solution file (.sln), Projects
file (*.csproj):  SDK, references to other projects, "Target" framework,
`Program.cs` - Main method, `Startup.cs` - `ConfigureServices`

#### Lesson 06 Create Core solutions (*.sln) and Projects (*.csproj)

1. Examine the Sdk and Run-time libraries on the Dev-box
2. `$ dotnet --info`
3. Neil C is on `3.0.x`
4. Create the projects container
5. `$ mkdir /_Projects/_Rider/ nc-dotnet`
6. Create the Project name/ folder
7. `$ mkdir nc-dotnet/reactivities`
8. Move to terminal in Rider app
9. `$ cd nc-dotnet/reactivities`
10. `$ open -na "Rider EAP.app ."`
11.  Create the solution file - sln
10. `sln` container- `reactivities.sln`
11. `$ dotnet new sln`
12. Create `Class1.cs` , `Domain.csproj` , `obj` folder
13. Create `classlib` projects
14. Create `webapi` project
15. Create project for Domain entities
16. `$ dotnet new classlib -n Domain`
17. `$ dotnet new classlib -n Application`
18. `$ dotnet new classlib -n Persistence`
19. `$ dotnet new webapi -n API`
20. at this point, the `solution` file knows nothing about the projects
21. and the dependencies have not been established

#### Lesson 07 Create Project references w DotNet CLI
1. Add projects to the Solution file
2. `$ dotnet sln add Domain/`
3. `$ dotnet sln add Application/` ...
4. using dotnet, get a list of the projects in Solution
5. `$ dotnet sln list`
6. Add reference to `Domain/` in `Application.csproj` ...
7. `$ cd Application/`
8. `$ dotnet add reference ../Domain/`
9. `$ dotnet add reference ../Persistence/`
10. here is where we are
11. Solution with 4 project folders
12. ![Less07 Proj-struct](Documentation/images/Less07%20Project-struct.png)<!-- @IGNORE PREVIOUS: link -->

#### Lesson 08 Review project files
1. Should never touch the `sln` file
2. `Persistence/Class1.cs`
3. `Persistence/Persistence.csproj`
4. `*.csproj` includes project dependencies
5. `<project-group>`need to target a higher level of Entity Framework
6. start w lowest level of framework that's compatible across projects
7. Make `/bin` and `/obj` disappear
8. May not be able to do this with `Rider EAP`
9. However, they are gone from the **default** Solution view
10. `/application/application.csproj`
11. `/api/api.csproj`
12. `Sdk="MS.Net.Sdk.Web"`
13. start an application
14. load a web server
15. start logging
16. `Program.cs` contains the `Main()`
17. calls `CreateHostBuilder`
18. return an instance of `IHostBuilder`
19. calls `CreateDefaultBuilder` and
20. calls `ConfigureWebHostDefaults`
21. calls the `Startup.cs`
22. `ConfigureServices()` is the **DI container**
23. this method gets called by the Runtime to add services
24. `Configure` - also called by Runtime add Middleware; 
25. when adding MW pieces, ordering is important
26. apply defaults - current dir
27. run config on “user-secrets”
28. run config on Kestrel web-server
29. `webBuilder.UseStartup`
30. load config into start-up class
31. use configure to manage request pipeline
32. middleware - DeveloperExceptionPage()
33. we don’t want to manage “self-signed certificates”… we’ll turn off while developing
34. map controller endpoints …
35. Don’t listen on https

#### ASP.NetCore In Action  Ch02 
##### 2.6 the Program class
1. `IWebHost` is the core of your ... app, containing the configuration and 
the Kestrel server that listens for requests and sends responses
2. in Main(),   `BuildWebHost(args).Run();`
3. calls Startup and Build
4. `public static IWebHost BuildWebHost(..) => WebHost.CreateDefaultBuilder(args)`
            `.UseStartup<Startup>().Build();`
5. ... pattern delays creation until all configuration is complete
6. startup is where you configure app services and
7. build the middleware pipeline
8. ![Config Scope Program Startup.png](Documentation/images/Config%20Scope%20Program%20Startup.png)<!-- @IGNORE PREVIOUS: link -->


#### Lesson 09 Run application

1. refactor "WeatherForecast Controller and class"
2. Create new file `ValuesController.cs`
3. API controller must have a "route"
4. Attribute-based routing
5. `[conroller]` in the route is a placeholder
6. Add http-get method
7. Add http-get with param -  `[HttpGet("{id}")]`
8. Run application, must tell Rider the location of app "entry-point"
9. `$ dotnet run -p API/`
10. go to browser to see app results ... listening at: `localhost:5000`
11. Next - create domain entity, create a db, and extract from db

#### Lesson 09 - Add source control

1.  `$ git init`
2. `$ git status`
3. Create `.gitignore`
4. `$ git status`
5. `$ git add .`
6. `$ git commit -m "[message]"`
7. Sign-in to github account
8. Create new project - “reactivities”
9. Click create
10. from local terminal, enter the following
11. `$ git remote add origin https://...reactivities.git`
12. from local terminal, complete a `push`
13. Note, push did not work till I disabled 2 factor authentication
14. `$ git push -u origin master

#### Lesson 10 Create Domain entity
1. Refactor `Domain/Class.cs` to `Value.cs`
2. Change name of class
3. attributes - `int Id`
4. attribute - `string Name`
5. EF understands that `Id` is the table key
6. method follows "code-first" 

#### Lesson 11 Create 
1. entity class needs a public property for each column
2. next step is to sub-class DbContext... 
3. sub-class instance represents sessions working with the database
4. `public class DataContext : DbContext {`
5. direct context to work with entity tables
6. no work is performed in `constructor`
7. `public DbSet<Customer> Customers { get; set; }`
8. DBContext, 3 jobs: 1] Factory for DbSet; 2] Track changes; 3] virtual...
9. **NEVER** ignore warnings about version issues
10. Make DbContext avaialbe generally as a service
11. 
