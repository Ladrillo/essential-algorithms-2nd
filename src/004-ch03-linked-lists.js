export function Node(data, next = null) {
  this.data = data
  this.next = next
}

export function LinkedList() {
  this.head = { next: null } // sentinel
}

LinkedList.prototype.iterate = function () {
  let values = []
  let pointer = this.head.next // sentinel helps

  while (pointer) {
    values.push(pointer.data)
    pointer = pointer.next
  }
  return values
}

LinkedList.prototype.insertAtBeginning = function (data) {
  if (data instanceof Node) {
    data.next = this.head.next
    this.head.next = data
  } else {
    this.head.next = new Node(data, this.head.next)
  }
}

LinkedList.prototype.insertAtEnd = function (data, loop) {
  let pointer = this.head

  while (pointer) {
    if (pointer.next === null) {
      pointer.next = data instanceof Node
        ? data
        : new Node(data)
      if (loop) {
        pointer.next.next = this.head
      }
      return
    }
    pointer = pointer.next
  }
}

LinkedList.prototype.insertAfterNode = function (node, data) {
  const newNode = new Node(data, node.next)
  node.next = newNode
}

LinkedList.prototype.deleteNode = function (node) {
  let pointer = this.head

  while (pointer) {
    if (pointer.next === node) {
      pointer.next = pointer.next.next
      delete node.data
      delete node.next
      return
    }
    pointer = pointer.next
  }
}

LinkedList.prototype.findNode = function (data) {
  let pointer = this.head.next

  while (pointer) {
    if (pointer.data === data) return pointer
    pointer = pointer.next
  }
  return null
}

LinkedList.prototype.findNodeBefore = function (data) {
  let pointer = this.head

  while (pointer.next) {
    if (pointer.next.data === data) {
      return pointer
    }
    pointer = pointer.next
  }
  return null
}

LinkedList.prototype.copy = function () {
  const newList = new LinkedList()

  let oldNode = this.head.next
  let latestAdded = newList.head

  while (oldNode) {
    const newNode = new Node(oldNode.data)
    latestAdded.next = newNode
    oldNode = oldNode.next
    latestAdded = newNode
  }
  return newList
}

LinkedList.prototype.hasALoop = function () {
  let pointer = this.head
  let hasALoop = false

  while (pointer.next) {
    if (pointer.next.visited) {
      pointer.next = null // breaking the loop
      hasALoop = true
      break
    } else {
      pointer.visited = true
      pointer = pointer.next
    }
  }

  // now we need to clean up the "visited" markings
  pointer = this.head

  while (pointer) {
    delete pointer.visited
    pointer = pointer.next
  }

  return hasALoop
}

LinkedList.prototype.hasALoopHashTable = function () {
  let pointer = this.head
  let hashTable = []

  while (pointer.next) {
    if (hashTable.includes(pointer.next)) {
      return true
    } else {
      hashTable.push(pointer.next)
      pointer = pointer.next
    }
  }
  return false
}
