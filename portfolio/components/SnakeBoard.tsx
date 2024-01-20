// Source code based on: https://github.com/MaelDrapier/react-simple-snake

import styles from '../styles/SnakeBoard.module.css'
import React, { ReactElement } from 'react'

enum Direction {
  Up = 0,
  Left,
  Down,
  Right,
}

interface SnakeChunk {
  x: number
  y: number
}

interface BoardState {
  /**
   * @description The current snake {@link Direction}.
   */
  direction: Direction
  directionChanged: boolean
  width: number
  height: number
  blockWidth: number
  blockHeight: number
  gameLoopTimeout: number
  /**
   * @description The identifier returned by `setTimeout`, it's used to cancel a game loop when the component is erased.
   */
  timeoutId: number
  /**
   * @description The snake chunk positions in the game board.
   */
  snake: SnakeChunk[]
  /**
   * @description The last time the user typed a game key. It's expressed in milliseconds.
   */
  lastUserActionAt: number
  /**
   * @description The number of iterations(game loop) the bot won't change its direction.
   */
  botIdleTicks: number
}

interface Props {
  percentageWidth?: number
}

export class SnakeBoard extends React.Component {
  userTimeoutMs: number = 3000
  state: BoardState
  props: Readonly<Props>

  constructor(props: Props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      direction: Direction.Right,
      directionChanged: false,
      width: 0,
      height: 0,
      blockWidth: 0,
      blockHeight: 0,
      gameLoopTimeout: 50,
      timeoutId: 0,
      snake: [],
      lastUserActionAt: 0,
      botIdleTicks: 0,
    }
  }

  render(): ReactElement {
    return (
      <div
        id="game-board"
        className={styles.game_board}
        style={{
          width: this.state.width,
          height: this.state.height,
          borderWidth: this.state.width / 50,
        }}
      >
        {this.state.snake.map((chunk, index) => {
          return (
            <div
              key={index}
              className={styles.chunk}
              style={{
                width: this.state.blockWidth,
                height: this.state.blockHeight,
                left: chunk.x,
                top: chunk.y,
                backgroundColor: '#d11b3a',
              }}
            ></div>
          )
        })}
      </div>
    )
  }

  componentDidMount(): void {
    this.initGame()
    window.addEventListener('keydown', this.handleKeyDown)
    this.gameLoop()
  }

  componentWillUnmount(): void {
    clearTimeout(this.state.timeoutId)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  initGame(): void {
    const width = this.getInitialWidth()

    const height = (width / 3) * 2,
      blockWidth = width / 30,
      blockHeight = height / 20

    const snake: Array<SnakeChunk> = []

    const y = height / 2
    let x = width / 2

    const head: SnakeChunk = { x, y }
    snake.push(head)

    const startSnakeSize = 8

    for (let i = 1; i < startSnakeSize; i++) {
      x -= blockWidth
      snake.push({ x, y })
    }

    this.setState({
      width,
      height,
      blockWidth,
      blockHeight,
      snake,
    })
  }

  gameLoop(): void {
    const timeoutId = setTimeout(() => {
      this.tryToUseBot()
      this.moveSnake()
      this.setState({ directionChanged: false })
      this.gameLoop()
    }, this.state.gameLoopTimeout)

    this.setState({ timeoutId })
  }

  useBot(): boolean {
    return Date.now() - this.state.lastUserActionAt > this.userTimeoutMs
  }

  tryToUseBot(): void {
    if (!this.useBot()) return

    let { botIdleTicks } = this.state

    if (botIdleTicks === 0) {
      if (this.setDirection(this.getRandomDirection())) {
        botIdleTicks = Math.floor(Math.random() * 15)
        this.setState({ botIdleTicks })
      }
    } else {
      botIdleTicks--
      this.setState({ botIdleTicks })
    }
  }

  getRandomDirection(): Direction {
    const directions = Object.values(Direction)

    return Math.floor((Math.random() * directions.length) / 2)
  }

  /**
   * @description Updates the snake body based on the current position of the head.
   */
  moveSnake(): void {
    const { snake } = this.state
    let previousPartX = snake[0].x
    let previousPartY = snake[0].y
    let tmpPartX = previousPartX
    let tmpPartY = previousPartY

    this.moveHead()

    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].x
      tmpPartY = snake[i].y
      snake[i].x = previousPartX
      snake[i].y = previousPartY
      previousPartX = tmpPartX
      previousPartY = tmpPartY
    }

    this.setState({ snake })
  }

  moveHead(): void {
    switch (this.state.direction) {
      case Direction.Up:
        this.moveHeadUp()
        break
      case Direction.Left:
        this.moveHeadLeft()
        break
      case Direction.Right:
        this.moveHeadRight()
        break
      default:
        this.moveHeadDown()
    }
  }

  moveHeadLeft(): void {
    const { width, blockWidth, snake } = this.state

    snake[0].x =
      snake[0].x - blockWidth <= 0
        ? width - blockWidth
        : snake[0].x - blockWidth
    this.setState({ snake })
  }

  moveHeadUp(): void {
    const { height, blockHeight, snake } = this.state

    snake[0].y =
      snake[0].y - blockHeight <= 0
        ? height - blockHeight
        : snake[0].y - blockHeight

    this.setState({ snake })
  }

  moveHeadRight(): void {
    const { width, blockWidth, snake } = this.state

    snake[0].x =
      snake[0].x >= width - blockWidth * 3 ? 0 : snake[0].x + blockWidth
    this.setState({ snake })
  }

  moveHeadDown(): void {
    const { height, blockHeight, snake } = this.state

    snake[0].y =
      snake[0].y >= height - blockHeight * 3 ? 0 : snake[0].y + blockHeight
    this.setState({ snake })
  }

  convertRemToPixels(rem: number): number {
    // https://stackoverflow.com/a/42769683
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }

  getInitialPercentageWidth(): number {
    return this.props.percentageWidth || 40
  }

  getInitialWidth(): number {
    return this.convertRemToPixels(17)
  }

  /**
   * @description Handles a user keyboard event. It's meant to
   * be used with `window.addEventListener`.
   */
  handleKeyDown(event: any) /* <- KeyboardEvent */ {
    if (this.state.directionChanged) return

    this.setState({ lastUserActionAt: Date.now() })

    /* eslint indent: "off" */
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.setDirection(Direction.Up)
        break
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.setDirection(Direction.Left)
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.setDirection(Direction.Right)
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        this.setDirection(Direction.Down)
        break
    }
  }

  /**
   * @description Tries to update the snake direction, if the direction wasn't changed `false` is returned.
   */
  setDirection(newDirection: Direction): boolean {
    const oldDirection = this.state.direction

    if (oldDirection == newDirection) return false

    switch (oldDirection) {
      case Direction.Left:
        if (newDirection == Direction.Right) return false
        break
      case Direction.Right:
        if (newDirection == Direction.Left) return false
        break
      case Direction.Down:
        if (newDirection == Direction.Up) return false
        break
      case Direction.Up:
        if (newDirection == Direction.Down) return false
        break
    }

    this.setState({ direction: newDirection, directionChanged: true })
    return true
  }
}
