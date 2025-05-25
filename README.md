# Noroff - FED EXAMN 2025

## Resources

- [Design prototype](https://www.figma.com/proto/3Cl9K25cROC5n4UMTJoV50/Exam-fed-spring-2025?page-id=0%3A1&node-id=195-1762&p=f&viewport=18616%2C-2933%2C0.35&t=RqOG6rRX02n7ilVu-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=195%3A1762&show-proto-sidebar=1)
- [Design system](https://www.figma.com/design/Ylx17wjh4vO69qiB8nE0Ep/FED-EXAM-DESIGN-SYSTEM?node-id=0-1)
- [Brief](https://lms.noroff.no/mod/folder/view.php?id=121394)
- [Production deploy](https://inspireink-blog.netlify.app/)
- [API Docs](https://docs.noroff.dev/docs/v2/blog/posts)
- [API Endpoint](https://api.noroff.dev/v2/blog/posts)

## Report

During this exam period, I have built a significantly stronger foundation in frontend development, both in terms of technical skill and the way I approach a complex project. My goal was to create a professional, content-rich gaming website that caters to casual gamers, industry enthusiasts, and game developers. The platform features gaming news, reviews, developer insights, and blog posts that together reflect the broad world of gaming.

From the beginning, I made a deliberate decision to focus on functionality first. My first milestone was implementing full CRUD functionality, allowing users to register, log in, and create, update, and view blog posts. This choice was based on experience from a previous project where I spent too much time designing and was left with limited time actually code. By following this approach, I ensured that the technical structure was solid before moving into the visual design. An added benefit of this strategy was that design ideas naturally emerged as I worked with the functionality.

Once the foundational features were complete, I switched over to the design phase and spent a significant amount of time in Figma. I developed high-fidelity wireframes, a design system, and prototypes for both mobile and desktop view. The design system included typography, color palettes and reusable components to ensure visual consistency throughout the website. After finalizing the design, I went back into coding mode and focused on implementing it across the project.

Throughout the process, I encountered a wide range of challenges. These included managing authentication flows, restricting CRUD operations to logged-in users, building responsive carousels and grids, and working with the API. Interestingly, some of the most time-consuming parts of the project were small design features like the filtering and search section, which I revised repeatedly during the whole project to get right. In contrast, many of the more complex JavaScript tasks were quicker to solve. To me personally, that’s because the design process is more abstract and preferences change, whereas a certain functionality is easier to define and try to solve.

I emphasized modular coding, and used export functions wherever a function was used several times and worked with several javascript files for separation of concern. I used version control by creating branches from kanban board issues, which helped me stay organized and focused.

This project has helped me grow as a frontend developer, not only in terms of code and design, but in the ability to scope, plan, and complete a website.

## Minimum acceptence criteria (Required - 50%)

All of these todo's must be done to pass the asssignment.

- [ ] A error message is present when the End-user encounters a error while viewing the index page.
- [ ] A error message is present when the End-user encounters a error while viewing the details page.
- [ ] As a customer I can view the title of the item on the browser tab for a details page.
- [ ] As a customer I can view validation message when they input an incorrect name.
- [ ] As a customer I can view validation message when they input an incorrect subject that is less than 15 characters.
- [ ] As a customer I can view validation message when they input an incorrect Email address.
- [ ] As a customer I can view a validation message when they input an incorrect physical address that is less than 25 characters long.
- [ ] As a customer I want to be able to view the latest blog posts on the home page.
- [ ] As a customer, I want to see a list of the first 10 blog posts on the blog section, so that I can quickly scan through the content and decide which posts I want to read.
- [ ] As a customer I want to be able to view a list of all blog posts on the blog section.
- [ ] As a customer I want A responsive website that can be As a customer, I want to ensure that the website is responsive and accessible so that I can access it on any device and easily navigate through it using any accessibility tools I need.
- [ ] As a customer, I want to see a clear and visually appealing design on the website, so that I can easily read the content and engage with the website.
- [ ] As a customer, I want to see a carousel/slider on the home page to display the latest blog posts, so that I can quickly access and view the latest content.
- [ ] As a customer, I want to be able to click on a blog post and be taken to a page with specific details about that post, so that I can get more in-depth information about the topic.
- [ ] As a customer, I want to be able to click on images in a blog post and see a larger version in a modal, so that I can view images in greater detail.
- [ ] As a customer, I want to be able to easily contact the website owners through a contact form, so that I can reach out with any questions or feedback.
- [ ] As a customer, I want to see error messages when I fill out the contact form incorrectly, so that I can correct my mistakes and successfully submit my message.

## End-user success criteria (Optional - 100%)

- [ ] End-user can search for a specific item.
- [ ] End-user can filter the list.
- [ ] End-user can sort list by;
  - [ ] Name ascending order
  - [ ] Name descending order
- [ ] Confirmation modal after custumer submits a successful contact form.
- [ ] End-user can auto-fill the contact form using the browser auto-fill.
- [ ] End-user can auto-fill the contact form using a password manager.
- [ ] Validation still works when End-user uses copy and pastes into input fields.
- [ ] End-user can see a postive feedback when they input correct info and pass validation.
- [ ] End-user can experience pleasant animations.
- [ ] End-user needs to prove there are human using a captcha feature on the contact form.
  - [ ] Each item in the list has a staggered animation.
  - [ ] Contact form success modal fades in.
- [ ] End-user can view a custom favicon.
- [ ] CSS uses variables
- [ ] Code is dry - There are no repeating functions, variables.
- [ ] My commit messages are relavant and make sense. [How to write good commit messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
- [ ] As a stakeholder, I want to view the website analytics.
- [ ] As a stakeholder, I want to show my customers a disclamer on the website, so that they are aware of the terms and conditions of using the website.
- [ ] As a customer, I want to ensure that my personal information submitted through the contact form is kept secure and not shared with any third-party entities.
- [ ] As a customer, I want to be able to sort, filter, or search the blog posts, so that I can quickly find the content that is most relevant to me.
- [ ] As a customer, I want to be able to submit comments on a blog post, so that I can engage with other readers and share my thoughts on the topic.
- [ ] As a customer, I want to be able to view the blog posts in a carousel, so that I can easily navigate through the content.

## Technical Requirements (Required - 100%)

- [ ] All pages should have a consistent responsive design
- [ ] All pages should pass HTML validation
- [ ] All pages should pass WCAG requirements (minimum AA)
- [ ] All interactive elements should have hover and focus states
- [ ] Site should work on all modern browsers (Chrome, Firefox, Edge, Safari)
- [ ] All forms should have proper validation with clear feedback
- [ ] Implement proper SEO meta tags
- [ ] Ensure proper semantic HTML structure
- [ ] Implement proper error handling for API requests
- [ ] Use BEM methodology for CSS naming conventions
- [ ] Ensure cross-browser compatibility
- [ ] Implement loading states for asynchronous operations
- [ ] Use proper Git workflow with feature branches
- [ ] Write clean, maintainable, and documented code
- [ ] Implement proper error boundaries and fallbacks

## API Integration Requirements

- [ ] Implement proper authentication flow
- [ ] Handle API rate limiting
- [ ] Implement proper caching strategies
- [ ] Handle API errors gracefully
- [ ] Implement proper data validation
- [ ] Use proper security measures for API calls
- [ ] Implement proper state management
- [ ] Handle offline functionality
- [ ] Implement proper loading states
- [ ] Use proper error handling

## Testing Requirements

- [ ] Check on both mobile and desktop devices.
- [ ] Check on both light and dark mode.

## Performance Requirements

- [ ] Optimize image loading and delivery
- [ ] Implement proper code splitting
- [ ] Use proper caching strategies
- [ ] Optimize bundle size
- [ ] Implement proper lazy loading
- [ ] Use proper performance monitoring
- [ ] Implement proper error tracking
- [ ] Use proper analytics tracking
- [ ] Implement proper logging
- [ ] Use proper monitoring tools

## [End-user experiences a complete custom UI design.](https://www.figma.com/file/KExTTAE75DRhq2xTvapFR4/FED-Whiteboard?node-id=0%3A1&t=UItKehGgT8gRlibY-1)

- [ ] Is user-friendly
- [ ] Effective use of the pillars of design
  - [ ] Typography
  - [ ] Colour
  - [ ] Composition
  - [ ] Art Direction
  - [ ] Motion
- [ ] Adhered to principles of design
  - [ ] Contrast
  - [ ] Balance and alignment
  - [ ] Emphasis
  - [ ] Proportion
  - [ ] Hierarchy
  - [ ] Repetition
  - [ ] Rhythm
  - [ ] Pattern
  - [ ] Negative space
  - [ ] Movement

## Checklist

Make sure you go through this checklist before submitting your project to Moodle.

- [X] All pages have a meta description.
- [X] All pages have a valid title.
- [X] All pages import the correct css files.
- [X] All pages import the correct JS file.
- [X] Details page URL includes a query param.
- [X] My website makes a GET request to an API to get a list of results.
- [X] My website makes a GET request to an API to get details of one result.
- [X] Input fields have the following attributes;
- [X] All images have an alt tag;
  - [X] A name,
  - [X] A placeholder,
  - [X] A aria-describedby,
  - [X] Required
- [X] I have not copied Javascript code.
- [X] I have not used a Javascript library.
- [X] Removed all unused files.
- [X] Named all images properly.
- [X] Committed all my code to github.
- [ ] My repo is publically viewable.
- [X] _Note: Repository visibility is managed by the course instructors in GitHub Classroom._
- [X] I've submitted/ written a report.
- [X] I've removed all todo notes in code.
- [X] I've removed all console logs in code.
- [X] Code is formatted correctly.
- [X] There are no red underlines in VSCode.
- [X] There are no error messages in the terminal when I run the project.
- [X] My code is indented correctly.
- [X] I've checked my report for grammer & spelling using grammerly or chatGPT
- [X] I've used used [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [X] I've checked off every todo in this README.

## Help & Tutorials

- [Web.dev](https://web.dev/learn/forms/)
- [Fed-Vocational-Astro-Course](https://fed-vocational-astro-course.vercel.app/en/html-css/module-2/forms)

## Application stack

- [Cypress](https://www.cypress.io/) - Next Generation Frontend Tooling

## Authors

- Morten Lillehaug (@Mortmeister)
- Monde Sineke (@S3ak)
