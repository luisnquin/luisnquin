package models

type (
	UserInfo struct {
		FullName        string  `json:"fullName"`
		SelfDescription string  `json:"selfDescription"`
		Contact         Contact `json:"contact"`
	}

	Contact struct {
		Email       string `json:"email"`
		Web         string `json:"web"`
		PhoneNumber string `json:"phoneNumber"`
	}
)
