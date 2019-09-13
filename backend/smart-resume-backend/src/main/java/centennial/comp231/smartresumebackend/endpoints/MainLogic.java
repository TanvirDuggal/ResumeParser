package centennial.comp231.smartresumebackend.endpoints;

import centennial.comp231.smartresumebackend.POJO.*;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MainLogic {

    Map<String, RegistrationInfo> userMap = new HashMap<>();
    Map<String, List<Job>> userJobMap = new HashMap<>();
    Map<String, Job> allJobs = new HashMap<>();
    Map<String, CandidateProfile> candidateProfileMap = new HashMap<>();
    Gson gson = new Gson();
    static int globalJobId = 1;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerCandidate(@RequestBody String payload) {
        RegistrationInfo registrationInfo = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(registrationInfo.getEmail())) {
            Response response = new Response(null, "User: " + registrationInfo.getEmail() + " already registered. Please use reset password if you forgot your password");
            return gson.toJson(response);
        } else {
            userMap.put(registrationInfo.getEmail(), registrationInfo);
            Response response = new Response(registrationInfo, "Registration Successful!");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginCandidate(@RequestBody String payload) {
        RegistrationInfo loginInfo = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(loginInfo.getEmail())) {
            RegistrationInfo user = userMap.get(loginInfo.getEmail());
            if (user.getPassword().equals(loginInfo.getPassword())) {
                Response response = new Response(user, "User: " + loginInfo.getEmail() + " login successful.");
                return gson.toJson(response);
            } else {
                Response response = new Response(null, "User: " + loginInfo.getEmail() + " provided incorrect password.");
                return gson.toJson(response);
            }
        } else {
            Response response = new Response(null, "User: " + loginInfo.getEmail() + " is not registered. Please use Sign Up to register first.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/deleteaccount", method = RequestMethod.DELETE)
    public String deleteAccount(@RequestBody String payload) {
        RegistrationInfo deleteAcc = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(deleteAcc.getEmail())) {
            userMap.remove(deleteAcc.getEmail());
            Response response = new Response(null, "User: " + deleteAcc.getEmail() + " has been deleted.");
            return gson.toJson(response);
        } else {
            Response response = new Response(null, "User: " + deleteAcc.getEmail() + " is not registered.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/updatepassword", method = RequestMethod.PUT)
    public String updatePassword(@RequestBody String payload) {
        RegistrationInfo updatePass = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(updatePass.getEmail())) {
            RegistrationInfo registrationInfo = userMap.get(updatePass.getEmail());
            registrationInfo.setPassword(updatePass.getPassword());
            userMap.remove(updatePass.getEmail());
            userMap.put(registrationInfo.getEmail(), registrationInfo);
            Response response = new Response(userMap.get(updatePass.getEmail()), "Password updated successfully!");
            return gson.toJson(response);
        } else {
            Response response = new Response(null, "User: " + updatePass.getEmail() + " is not registered.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
    public String updateProfile(@RequestBody String payload) {
        RegistrationInfo registrationInfo = gson.fromJson(payload, RegistrationInfo.class);
        CandidateProfile candidateProfile = gson.fromJson(payload, CandidateProfile.class);
        candidateProfile.setEmail(registrationInfo.getEmail());
        if (userMap.containsKey(registrationInfo.getEmail())) {
            candidateProfileMap.put(registrationInfo.getEmail(), candidateProfile);
            Response response = new Response(candidateProfileMap.get(registrationInfo.getEmail()), "User: " + registrationInfo.getEmail() + "'s profile registered.");
            return gson.toJson(response);
        } else {
            Response response = new Response(null, "User: " + registrationInfo.getEmail() + " is not registered.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/getprofile", method = RequestMethod.POST)
    public String getProfile(@RequestBody String payload) {
        RegistrationInfo registrationInfo = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(registrationInfo.getEmail())) {
            if (candidateProfileMap.containsKey(registrationInfo.getEmail())) {
                Response response = new Response(candidateProfileMap.get(registrationInfo.getEmail()), null);
                return gson.toJson(response);
            } else {
                Response response = new Response(null, "User: " + registrationInfo.getEmail() + "'s profile is not recorded.");
                return gson.toJson(response);
            }
        } else {
            Response response = new Response(null, "User: " + registrationInfo.getEmail() + " is not registered.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/addjob", method = RequestMethod.POST)
    public String addJob(@RequestBody String payload) {
        Job job = gson.fromJson(payload, Job.class);
        if (job.getJobId() == null) {
            job.setJobId("" + globalJobId++);
        }
        if (allJobs.containsKey(job.getJobId())) {
            Response response = new Response(allJobs.get(job.getJobId()), "Job ID already exists.");
            return gson.toJson(response);
        } else {
            allJobs.put(job.getJobId(), job);
            Response response = new Response(allJobs.get(job.getJobId()), "Job successfully added.");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/viewjobs", method = RequestMethod.POST)
    public String viewJobs() {
        Set<String> jobIds = allJobs.keySet();
        List<Job> allJobList = new ArrayList<>();
        for (String jobId : jobIds) {
            allJobList.add(allJobs.get(jobId));
        }
        return gson.toJson(allJobList);
    }

    @RequestMapping(value = "/applyjob", method = RequestMethod.POST)
    public String applyJob(@RequestBody String payload) {
        UserJob userJob = gson.fromJson(payload, UserJob.class);
        if (userMap.containsKey(userJob.getEmail()) && allJobs.containsKey(userJob.getJobId())) {
            List<Job> jobsForUser = userJobMap.get(userJob.getEmail());
            if (jobsForUser == null) {
                jobsForUser = new ArrayList<>();
            }
            if(jobsForUser.contains(allJobs.get(userJob.getJobId()))){
                Response response = new Response(null, "You have already applied to this Job!");
                return gson.toJson(response);
            } else {
                jobsForUser.add(allJobs.get(userJob.getJobId()));
                userJobMap.put(userJob.getEmail(), jobsForUser);
                Response response = new Response(userJobMap.get(userJob.getEmail()), "Congratulations! You have applied to " + allJobs.get(userJob.getJobId()).getJobTitle());
                return gson.toJson(response);
            }
        } else {
            Response response = new Response(userJob, "Invalid job id or user email");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/appliedjobs", method = RequestMethod.POST)
    public String appliedJobs(@RequestBody String payload) {
        RegistrationInfo registrationInfo = gson.fromJson(payload, RegistrationInfo.class);
        if (userMap.containsKey(registrationInfo.getEmail())) {
            List<Job> jobsForUser = userJobMap.get(registrationInfo.getEmail());
            return gson.toJson(jobsForUser);
        } else {
            Response response = new Response(registrationInfo.getEmail(), "Email not registered");
            return gson.toJson(response);
        }
    }

    @RequestMapping(value = "/candidatesforjob", method = RequestMethod.POST)
    public String candidatesForJob(@RequestBody String payload) {
        Job job = gson.fromJson(payload, Job.class);
        if (allJobs.containsKey(job.getJobId())) {
            List<CandidateProfile> candidatesAppliedForJob = new ArrayList<>();
            Set<String> allUsersWhoAppliedAnyJob = userJobMap.keySet();
            for (String userEmail : allUsersWhoAppliedAnyJob) {
                List<Job> jobsForUser = userJobMap.get(userEmail);
                for (Job currentJob : jobsForUser) {
                    if (currentJob.getJobId().equals(job.getJobId())) {
                        candidatesAppliedForJob.add(candidateProfileMap.get(userEmail));
                    }
                }
            }
            return gson.toJson(candidatesAppliedForJob);
        } else {
            Response response = new Response(job.getJobId(), "Job ID does not exist");
            return gson.toJson(response);
        }
    }

}
