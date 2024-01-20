// Source code based on: https://github.com/MaelDrapier/react-simple-snake

import styles from '../styles/SnakeBoard.module.css'
import React, { ReactElement } from 'react'

enum Direction {
  Up = 1,
  Left,
  Down,
  Right,
}

interface SnakeChunk {
  x: number
  y: number
}

interface BoardState {
  direction: Direction
  directionChanged: boolean
  width: number
  height: number
  blockWidth: number
  blockHeight: number
  gameLoopTimeout: number
  timeoutId: number
  snake: SnakeChunk[]
}

interface Props {
  percentageWidth?: number
}

export class SnakeBoard extends React.Component {
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

    const startSnakeSize = 6

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
      this.moveSnake()
      this.setState({ directionChanged: false })
      this.gameLoop()
    }, this.state.gameLoopTimeout)

    this.setState({ timeoutId })
  }

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
    const width = this.state.width,
      blockWidth = this.state.blockWidth,
      snake = this.state.snake

    snake[0].x = snake[0].x <= 0 ? width - blockWidth : snake[0].x - blockWidth
    this.setState({ snake })
  }

  moveHeadUp(): void {
    const height = this.state.height,
      blockHeight = this.state.blockHeight,
      snake = this.state.snake

    snake[0].y =
      snake[0].y <= 0 ? height - blockHeight : snake[0].y - blockHeight
    this.setState({ snake })
  }

  moveHeadRight(): void {
    const width = this.state.width,
      blockWidth = this.state.blockWidth,
      snake = this.state.snake

    snake[0].x = snake[0].x >= width - blockWidth ? 0 : snake[0].x + blockWidth
    this.setState({ snake })
  }

  moveHeadDown(): void {
    const height = this.state.height,
      blockHeight = this.state.blockHeight,
      snake = this.state.snake
    snake[0].y =
      snake[0].y >= height - blockHeight ? 0 : snake[0].y + blockHeight
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
    // const board = document.getElementById(this.boardElementId)
    // let width =
    //   board.parentElement.offsetWidth * (this.getInitialPercentageWidth() / 100)
    // width -= width % 30

    // if (width < 30) return 30

    // console.log('initial width: ', width)

    return this.convertRemToPixels(17)
  }

  handleKeyDown(event: any) /* <- KeyboardEvent */ {
    if (this.state.directionChanged) return

    /* eslint indent: "off" */
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.goUp()
        break
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.goLeft()
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.goRight()
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        this.goDown()
        break
    }

    this.setState({ directionChanged: true })
  }

  goLeft(): void {
    this.setDirection(
      this.state.direction == Direction.Right ? Direction.Right : Direction.Left
    )
  }

  goRight(): void {
    this.setDirection(
      this.state.direction == Direction.Left ? Direction.Left : Direction.Right
    )
  }

  goUp(): void {
    this.setDirection(
      this.state.direction == Direction.Down ? Direction.Down : Direction.Up
    )
  }

  goDown(): void {
    this.setDirection(
      this.state.direction == Direction.Up ? Direction.Up : Direction.Down
    )
  }

  setDirection(direction: Direction): void {
    this.setState({ direction })
  }
}
