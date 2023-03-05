package models

type (
	UserInfo struct {
		FullName        string          `json:"fullName"`
		SelfDescription string          `json:"selfDescription"`
		Contact         Contact         `json:"contact"`
		HardSkills      []string        `json:"hardSkills"`
		SoftSkills      []string        `json:"softSkills"`
		JobExperiences  []JobExperience `json:"jobExperiences"`
		Hobbies         []Hobby         `json:"hobbies"`
	}

	Contact struct {
		Email       string `json:"email"`
		Web         string `json:"web"`
		PhoneNumber string `json:"phoneNumber"`
	}

	JobExperience struct {
		Position    string `json:"position"`
		Company     string `json:"company"`
		FromToLabel string `json:"fromToLabel"`
		Description string `json:"description"`
	}

	Hobby struct {
		Label       string `json:"label"`
		Description string `json:"description"`
	}
)
