import React from 'react'

import { Computer } from '../models'
import styles from '../styles/ComputerSection.module.css'

interface Props {
  computer: Computer
}

export const ComputerSection = ({ computer }: Props): React.JSX.Element => {
  return (
    <section id="computer-section" className={styles.computer_section}>
      <h2>Computer</h2>

      <div className={styles.computer_specs}>
        <table>
          <tbody>
            <tr>
              <th>Kernel</th>
              <td>{computer.kernel}</td>
            </tr>

            <tr>
              <th>Distro</th>
              <td>{computer.distro}</td>
            </tr>

            <tr>
              <th>DE</th>
              <td>{computer.de}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <th>Shell</th>
              <td>{computer.shell}</td>
            </tr>

            <tr>
              <th>Features</th>
              <td>{computer.features}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
