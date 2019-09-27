using System;
using System.Collections.Generic;

namespace RabbitMqPoc.Dtos
{
    public class EventMessageDto
    {
        public string Sender { get; set; }
        public string ActionType { get; set; }
        public string ChangedEntity { get; set; }
        public string ChangedProperty { get; set; }
        public List<string> PrimaryKey { get; set; }
        public string NewValue { get; set; }
        public byte[] NewEntity { get; set; }
        public DateTime ChangedOn { get; set; }
        public string ChangedBy { get; set; }
        public string Environment { get; set; }
        public Dictionary<string, string> PrimaryKeys { get; set; }
        public Dictionary<string, string> ChangedData { get; set; }
        //public List<EntityParentDto> Parents { get; set; }
  }
}
