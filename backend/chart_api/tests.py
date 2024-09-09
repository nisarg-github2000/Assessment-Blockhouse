from django.test import TestCase, Client
from django.urls import reverse
import logging
import os

class CandlestickDataViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.logger = logging.getLogger('django')

    def test_candlestick_data_success(self):
        """Test that the CandlestickDataView returns data successfully"""
        response = self.client.get(reverse('candlestick-data'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('data', response.json())
        self.assertIsInstance(response.json()['data'], list)
        self.assertGreater(len(response.json()['data']), 0)  # Ensure there's some data

    def test_candlestick_data_error_logging(self):
        """Test that an error is logged when an exception occurs"""
        # Simulate an error in the CandlestickDataView
        with self.settings(DEBUG=True):
            response = self.client.get(reverse('candlestick-data') + '/invalid/')
            self.assertEqual(response.status_code, 404)  # Expect a not found error

            # Check if the error was logged
            log_file_path = 'debug.log'
            with open(log_file_path, 'r') as file:
                log_contents = file.read()

            self.assertIn('An error occurred:', log_contents)
            
class LineChartDataViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.logger = logging.getLogger('django')

    def test_line_chart_data_success(self):
        """Test that the LineChartDataView returns data successfully"""
        response = self.client.get(reverse('line-chart-data'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('labels', response.json())
        self.assertIn('data', response.json())
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)

    def test_line_chart_data_error_logging(self):
        """Test that an error is logged when an exception occurs"""
        with self.settings(DEBUG=True):
            response = self.client.get(reverse('line-chart-data') + '/invalid/')
            self.assertEqual(response.status_code, 404)  # Expect a not found error

            # Check if the error was logged
            log_file_path = 'debug.log'
            with open(log_file_path, 'r') as file:
                log_contents = file.read()

            self.assertIn('An error occurred:', log_contents)
            
class BarChartDataViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.logger = logging.getLogger('django')

    def test_bar_chart_data_success(self):
        """Test that the BarChartDataView returns data successfully"""
        response = self.client.get(reverse('bar-chart-data'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('labels', response.json())
        self.assertIn('data', response.json())
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)

    def test_bar_chart_data_error_logging(self):
        """Test that an error is logged when an exception occurs"""
        with self.settings(DEBUG=True):
            response = self.client.get(reverse('bar-chart-data') + '/invalid/')
            self.assertEqual(response.status_code, 404)  # Expect a not found error

            # Check if the error was logged
            log_file_path = 'debug.log'
            with open(log_file_path, 'r') as file:
                log_contents = file.read()

            self.assertIn('An error occurred:', log_contents)
            
class PieChartDataViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.logger = logging.getLogger('django')

    def test_pie_chart_data_success(self):
        """Test that the PieChartDataView returns data successfully"""
        response = self.client.get(reverse('pie-chart-data'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('labels', response.json())
        self.assertIn('data', response.json())
        self.assertIsInstance(response.json()['labels'], list)
        self.assertIsInstance(response.json()['data'], list)

    def test_pie_chart_data_error_logging(self):
        """Test that an error is logged when an exception occurs"""
        with self.settings(DEBUG=True):
            response = self.client.get(reverse('pie-chart-data') + '/invalid/')
            self.assertEqual(response.status_code, 404)  # Expect a not found error

            # Check if the error was logged
            log_file_path = 'debug.log'
            with open(log_file_path, 'r') as file:
                log_contents = file.read()

            self.assertIn('An error occurred:', log_contents)
            

# class InvalidEndpointTests(TestCase):
#     def setUp(self):
#         self.client = Client()
#         self.logger = logging.getLogger('django')

#     def test_invalid_endpoint_logging(self):
#         """Test that accessing an invalid endpoint logs an error"""
#         with self.settings(DEBUG=True):
#             response = self.client.get('/api/invalid-endpoint/')
#             self.assertEqual(response.status_code, 404)  # Expect a not found error

#             # Check if the error was logged
#             log_file_path = 'debug.log'
#             with open(log_file_path, 'r') as file:
#                 log_contents = file.read()

#             self.assertIn('An error occurred:', log_contents)