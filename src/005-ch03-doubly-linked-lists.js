export function DNode(data = null, prev = null, next = null) {
  this.data = data
  this.prev = prev
  this.next = next
}

export function DLinkedList() {
  const topSentinel = new DNode()
  const bottomSentinel = new DNode()

  topSentinel.next = bottomSentinel
  bottomSentinel.prev = topSentinel

  this.head = topSentinel
}

DLinkedList.prototype.insertAtBeginning = function (data) {
  const newNode = new DNode(data)
  const afterMe = this.head
  const beforeMe = this.head.next
  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = this.head
  beforeMe.prev = newNode
}

DLinkedList.prototype.insertAtEnd = function (data) {
  const newNode = new DNode(data)
  let pointer = this.head

  let afterMe
  let beforeMe

  while (pointer.next) {
    if (!pointer.next.next) {
      afterMe = pointer
      beforeMe = pointer.next
    }
    pointer = pointer.next
  }

  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = afterMe
  beforeMe.prev = newNode
}

DLinkedList.prototype.insertSorted = function (data) {
  const newNode = new DNode(data)

  let afterMe
  let beforeMe
  let pointer = this.head

  while (pointer) {
    const nextIsEndSentinel = pointer.next.data === null
    const nextHasBiggerData = pointer.next.data > data

    if (nextIsEndSentinel || nextHasBiggerData) {
      afterMe = pointer
      beforeMe = pointer.next
      break
    }
    pointer = pointer.next
  }

  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = afterMe
  beforeMe.prev = newNode
}

DLinkedList.prototype.findNodeMTF = function (data) {
  let pointer = this.head
  while (pointer.next) {
    if (pointer.data === data) {
      if (pointer !== this.head.next) {
        // MOVE THE FOUND NODE TO THE FRONT OF THE LIST
        // connect before and after
        let beforeNode = pointer.prev
        let afterNode = pointer.next
        beforeNode.next = afterNode
        afterNode.prev = beforeNode
        // put node after top sentinel
        beforeNode = this.head
        afterNode = this.head.next
        // update next links
        beforeNode.next = pointer
        pointer.next = afterNode
        // update prev links
        pointer.prev = beforeNode
        afterNode.prev = pointer
      }
      return pointer
    }
    pointer = pointer.next
  }
  return null
}
