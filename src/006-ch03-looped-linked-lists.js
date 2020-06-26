export function LNode(data, next = null) {
  this.data = data
  this.next = next
}

export function LLinkedList() {
  this.head = { next: null }
}
