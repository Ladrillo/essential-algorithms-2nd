function Node(data, prev = null, next = null) {
  this.data = data
  this.prev = prev
  this.next = next
}

function DLinkedList() {
  const topSentinel = new Node()
  const bottomSentinel = new Node()

  topSentinel.next = bottomSentinel
  bottomSentinel.prev = topSentinel

  this.head = topSentinel
}

describe('doubly linked lists', () => {
  it('can make a Node', () => {
    expect(new Node('foo')).toEqual({ data: 'foo', prev: null, next: null })
  })

  it('can make a Doubly Linked List', () => {
    const doublyLinkedList = new DLinkedList()
    expect(doublyLinkedList.head.prev).toEqual(null)
    expect(doublyLinkedList.head.next.next).toEqual(null)
    expect(doublyLinkedList.head.next.prev).toEqual(doublyLinkedList.head)
  })
})
