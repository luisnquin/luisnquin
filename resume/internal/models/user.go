package models

type (
	UserInfo struct {
		FullName        string          `json:"fullName"`
		PositionTitle   string          `json:"positionTitle"`
		SelfDescription string          `json:"selfDescription"`
		Contact         Contact         `json:"contact"`
		HardSkills      []string        `json:"hardSkills"`
		SoftSkills      []string        `json:"softSkills"`
		JobExperiences  []JobExperience `json:"jobExperiences"`
		Hobbies         []Hobby         `json:"hobbies"`
	}

	Contact struct {
		Email       string `json:"email"`
		Links       Links  `json:"links"`
		PhoneNumber string `json:"phoneNumber"`
	}

	Links struct {
		GitHub   string `json:"github"`
		LinkedIn string `json:"linkedIn"`
		Web      string `json:"web"`
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
