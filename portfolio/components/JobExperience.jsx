/*
 - CompanyName
 - Position
 - Impact
 */

export function JobExperience({ companyName, url, positionTitle, impact, actions }) {
    return (
        <div>
            <h4>
                {companyName} - <span> {positionTitle}</span>
                <ul>
                    <li></li>
                </ul>
            </h4>
        </div>
    )
}
