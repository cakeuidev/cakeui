export type SnowflakeOptions = {
  epoch?: number
  mid?: number
}

export class Snowflake {
  private readonly epoch: number
  private readonly mid: number
  private seq: number
  private lastTime: number

  constructor(options?: SnowflakeOptions) {
    const { epoch = 0, mid = 0 } = options ?? {}
    this.epoch = epoch
    this.mid = mid % 1024
    this.seq = 0
    this.lastTime = 0
  }

  generate(): bigint {
    let time = Date.now()
    if (time < this.lastTime || time < this.epoch) {
      throw Error('Clock moved backwards.')
    }
    if (time === this.lastTime) {
      this.seq = (this.seq + 1) & 4095
      if (this.seq === 0) {
        while (time <= this.lastTime) {
          time = Date.now()
        }
      }
    } else {
      this.seq = 0
    }
    this.lastTime = time
    const bTime = BigInt(time - this.epoch) << 22n
    const bMid = BigInt(this.mid) << 12n
    const bSeq = BigInt(this.seq)
    return bTime | bMid | bSeq
  }
}
