using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using RabbitMqPoc.Dtos;

namespace RabbitMqPoc.Services
{
    public class LiveUpdateService
    {
        private string HostName = "PVBMPRL0587";
        private string UserName = "guest";
        private string Password = "guest";
        private const string QueueName = "SAMPLE.SHARRIS@ADMIN|PVBMPRL0587|CF5E50DD-2D97-4965-A3E0-045115FB4196";
        private const string ExchangeName = "practice.HIQO.clinic.TEST3";
        private const string RoutingKey = "chart.bf607f4a-fbde-e911-80c6-0050568210b7.*";
        private const bool IsDurable = true;
        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private IModel _channel;

        public delegate void OnReceiveMessage(string message);
        public bool Enabled { get; set; }
        public List<EventMessageDto> EventMessageDtos { get; set; } = new List<EventMessageDto>();

        public LiveUpdateService()
        {
        }

        public void SetupConnection()
       {
            //var uri = new Uri(HostName);
            _connectionFactory = new ConnectionFactory
            {
                HostName = HostName,
                UserName = UserName,
                Password = Password
            };

            _connection = _connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(QueueName, false, false, true, null);
            _channel.QueueBind(QueueName, ExchangeName, RoutingKey);

            Console.WriteLine("Host: {0}", HostName);
            Console.WriteLine("Host: {0}", ExchangeName);
            Console.WriteLine("Username: {0}", UserName);
            Console.WriteLine("Password: {0}", Password);
            Console.WriteLine("QueueName: {0}", QueueName);


            //_channel.BasicQos(0, 1, false);
        }


        public EventMessageDto Consume()
        {
            var consumer = new QueueingBasicConsumer(_channel);
            _channel.BasicConsume(QueueName, false, consumer);
            var count = _channel.MessageCount(QueueName);

            //Get next message
            var deliveryArgs = (BasicDeliverEventArgs)consumer.Queue.Dequeue();

            //Serialize message
            var serializedMessage = Encoding.Default.GetString(deliveryArgs.Body);
            var eventMessage = JsonConvert.DeserializeObject<EventMessageDto>(serializedMessage);

            _channel.BasicAck(deliveryArgs.DeliveryTag, false);

            return eventMessage;
        }

    }
}
