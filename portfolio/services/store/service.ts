interface LocalRecord<T> {
    expiresAt?: number
    data: T
}

export class LocalStorageService {
    static async getItem<T>(key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const record: LocalRecord<T> = JSON.parse(localStorage.getItem(key))

            if (record.expiresAt && new Date().getTime() < record.expiresAt) {
                return resolve(record.data)
            }

            reject(`unable to find record with key '${key}' in local storage`)
        })
    }

    static setItem<T>(key: string, data: T) {
        const record: LocalRecord<T> = {
            data: data,
            expiresAt: null
        }

        localStorage.setItem(key, JSON.stringify(record))
    }

    static setItemWithTTL<T>(key: string, data: T, ttl: number = 3600) {
        const record: LocalRecord<T> = {
            data: data,
            expiresAt: new Date().getTime() + ttl * 1000
        }

        localStorage.setItem(key, JSON.stringify(record))
    }
}
