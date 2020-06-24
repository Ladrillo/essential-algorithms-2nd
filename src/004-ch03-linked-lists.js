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
  this.head.next = new Node(data, this.head.next)
}

LinkedList.prototype.insertAtEnd = function (data) {
  let pointer = this.head

  while (pointer) {
    if (pointer.next === null) {
      pointer.next = new Node(data)
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